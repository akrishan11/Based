import axios from "axios";
import {
	App,
	Editor,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
} from "obsidian";

interface NoteData {
	username: string;
	location_tag: string;
	inline_tags: Array<string>;
	text_content: string;
}

interface BasedSettings {
	joinCode: string;
	serverUrl: string;
	isAuthenticated: boolean;
	lastSyncTimestamp: number;
}

const DEFAULT_SETTINGS: BasedSettings = {
	joinCode: "",
	serverUrl: "https://based.shmul.dev/joinVault",
	isAuthenticated: false,
	lastSyncTimestamp: Date.now(),
};

export default class BasedPlugin extends Plugin {
	settings: BasedSettings;
	syncInterval: NodeJS.Timeout | null = null;

	async onload() {
		await this.loadSettings();
		new Notice("BasedPlugin loaded");

		// Add sync icon to the left ribbon
		const ribbonIconEl = this.addRibbonIcon(
			"user-plus",
			"Join Vault",
			(evt: MouseEvent) => {
				if (!this.settings.isAuthenticated) {
					new JoinCodeModal(this.app, this).open();
				} else {
					new Notice(
						"Already authenticated! Use sync button instead."
					);
				}
			}
		);
		ribbonIconEl.addClass("based-plugin-ribbon-class");

		const syncIconEl = this.addRibbonIcon(
			"folder-sync",
			"Sync Vault",
			(evt: MouseEvent) => {
				if (this.settings.isAuthenticated) {
					this.performFullSync();
				} else {
					new Notice("Please join the vault first!");
				}
			}
		);
		syncIconEl.addClass("based-plugin-sync-ribbon-class");

		this.addCommand({
			id: "sync-vault",
			name: "Sync Vault",
			callback: () => {
				if (!this.settings.isAuthenticated) {
					new JoinCodeModal(this.app, this).open();
				} else {
					this.performFullSync();
				}
			},
			editorCallback: (editor: Editor) => {
				if (this.settings.isAuthenticated) {
					this.performFullSync();
				} else {
					new Notice("Please join the vault first!");
					new JoinCodeModal(this.app, this).open();
				}
			},
		});

		this.addSettingTab(new SyncSettingTab(this.app, this));
	}

	async createOrUpdateNote(
		noteName: string,
		noteData: NoteData
	): Promise<void> {
		const sanitizedName = noteName
			.replace(/[\\/:#*?"<>|]/g, "_")
			.replace(/\s+/g, "_");
		try {
			const filePath = `${sanitizedName}.md`;
			const content = `---
username: ${noteData.username}
location: ${noteData.location_tag}
---\n\n${noteData.text_content}`;

			await this.app.vault.create(filePath, content);
			new Notice(`Created/Updated: ${filePath}`);
		} catch (err) {
			new Notice(`FAILED to create ${sanitizedName}: ${err.message}`);
			console.error("File creation error:", err);
			throw err;
		}
	}

	async fetchVaultData() {
		if (!this.settings.isAuthenticated) {
			throw new Error("Not authenticated");
		}

		try {
			const response = await axios.get(this.settings.serverUrl, {
				headers: {
					Authorization: `Bearer ${this.settings.joinCode}`,
					"Content-Type": "application/text",
				},
			});

			if (!response.data) {
				throw new Error("No data received from server");
			}

			new Notice("Successfully fetched vault data");
			return response.data;
		} catch (error) {
			console.error("Error fetching vault data:", error);
			throw error;
		}
	}

	async sendVaultData(frontmatterData: any[]) {
		const submitUrl = this.settings.serverUrl.replace(
			"/joinVault",
			"/submitText"
		);

		try {
			const response = await axios.post(submitUrl, frontmatterData, {
				headers: {
					Authorization: `Bearer ${this.settings.joinCode}`,
					"Content-Type": "application/text",
				},
			});

			if (!response.data) {
				throw new Error("No confirmation received from server");
			}

			new Notice("Successfully sent vault data to server");
			return response.data;
		} catch (error) {
			console.error("Error sending vault data:", error);
			throw error;
		}
	}

	async extractFrontmatter(file: TFile): Promise<any> {
		const content = await this.app.vault.read(file);
		const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
		const match = content.match(frontmatterRegex);

		if (match) {
			const frontmatterStr = match[1];
			const frontmatter: { [key: string]: string } = {};

			frontmatterStr.split("\n").forEach((line) => {
				const [key, ...values] = line.split(":");
				if (key && values.length) {
					frontmatter[key.trim()] = values.join(":").trim();
				}
			});

			return frontmatter;
		}

		return null;
	}

	async getAllFrontmatter(): Promise<any[]> {
		const files = this.app.vault.getMarkdownFiles();
		const frontmatterArray = [];

		for (const file of files) {
			const frontmatter = await this.extractFrontmatter(file);
			if (frontmatter) {
				frontmatterArray.push({
					filename: file.basename,
					frontmatter: frontmatter,
				});
			}
		}

		return frontmatterArray;
	}

	async performFullSync() {
		if (!this.settings.isAuthenticated) {
			new Notice("Please join the vault first!");
			return;
		}

		try {
			// First fetch updates from server
			new Notice("Fetching updates from server...");
			const serverData = await this.fetchVaultData();

			// Update local files with server data
			if (serverData) {
				for (const [noteKey, noteData] of Object.entries(serverData)) {
					await this.createOrUpdateNote(
						noteKey,
						noteData as NoteData
					);
				}
			}

			// Get local frontmatter data
			new Notice("Preparing local changes...");
			const frontmatterData = await this.getAllFrontmatter();

			// Send local changes to server
			new Notice("Sending local changes to server...");
			await this.sendVaultData(frontmatterData);

			// Update sync timestamp
			this.settings.lastSyncTimestamp = Date.now();
			await this.saveSettings();

			new Notice("Full sync completed successfully!");
		} catch (error) {
			new Notice(`Sync failed: ${error.message}`);
			console.error("Sync error:", error);
		}
	}

	async joinVault(joinCode: string) {
		try {
			// Set credentials first
			this.settings.joinCode = joinCode;
			this.settings.isAuthenticated = true;
			await this.saveSettings();

			// Perform initial sync
			new Notice("Joining vault and performing initial sync...");
			await this.performFullSync();

			new Notice("Successfully joined vault and completed initial sync!");
		} catch (error) {
			this.settings.isAuthenticated = false;
			this.settings.joinCode = "";
			await this.saveSettings();
			new Notice(`Failed to join vault: ${error.message}`);
			throw error;
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {
		if (this.syncInterval) {
			clearInterval(this.syncInterval);
		}
	}
}

class JoinCodeModal extends Modal {
	plugin: BasedPlugin;
	joinCode: string;

	constructor(app: App, plugin: BasedPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;

		contentEl.createEl("h3", { text: "Enter Join Code to Sync" });

		const inputContainer = contentEl.createDiv();
		const input = inputContainer.createEl("input", {
			type: "text",
			placeholder: "Enter your join code",
		});
		input.style.width = "100%";
		input.style.marginBottom = "1rem";

		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.display = "flex";
		buttonContainer.style.justifyContent = "flex-end";
		buttonContainer.style.gap = "0.25rem";

		const cancelButton = buttonContainer.createEl("button", {
			text: "Cancel",
		});
		cancelButton.addEventListener("click", () => {
			this.close();
		});

		const syncButton = buttonContainer.createEl("button", { text: "Join" });
		syncButton.classList.add("mod-cta");
		syncButton.addEventListener("click", async () => {
			const code = input.value.trim();
			if (code) {
				try {
					await this.plugin.joinVault(code);
					this.close();
				} catch (error) {
					new Notice("Failed to join. Please check your join code.");
				}
			} else {
				new Notice("Please enter a join code");
			}
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SyncSettingTab extends PluginSettingTab {
	plugin: BasedPlugin;

	constructor(app: App, plugin: BasedPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Server URL")
			.setDesc("Enter the URL of your sync server")
			.addText((text) =>
				text
					.setPlaceholder("Enter server URL")
					.setValue(this.plugin.settings.serverUrl)
					.onChange(async (value) => {
						this.plugin.settings.serverUrl = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Connection Status")
			.setDesc("Current authentication status")
			.addText((text) =>
				text
					.setValue(
						this.plugin.settings.isAuthenticated
							? "Connected"
							: "Not Connected"
					)
					.setDisabled(true)
			);

		if (this.plugin.settings.isAuthenticated) {
			new Setting(containerEl)
				.setName("Last Sync")
				.setDesc("Time of last successful sync")
				.addText((text) =>
					text
						.setValue(
							new Date(
								this.plugin.settings.lastSyncTimestamp
							).toLocaleString()
						)
						.setDisabled(true)
				);
		}
	}
}
