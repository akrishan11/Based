import axios from "axios";
import {
	App,
	Editor,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
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
	lastSyncTimestamp: 0,
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
					this.syncVault();
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
					this.syncVault();
				}
			},
			editorCallback: (editor: Editor) => {
				if (this.settings.isAuthenticated) {
					const mdContent = editor.getDoc().getValue();
					this.syncVault(mdContent);
				} else {
					new Notice("Please join the vault first!");
					new JoinCodeModal(this.app, this).open();
				}
			},
		});

		// Add settings tab
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
			// Generate filePath
			const filePath = `${sanitizedName}.md`;

			// Create file content with frontmatter
			const content = `---
	  username: ${noteData.username}
	  location: ${noteData.location_tag}
	  inline_tags: [${noteData.inline_tags.join(", ")}]
	  ---\n\n ${noteData.text_content}`;

			// Force create new file (overwrite if exists)
			await this.app.vault.create(filePath, content);

			new Notice(`Created: ${filePath}`);
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
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.settings.joinCode}`,
				},
			});

			console.log("Raw server response:", response);

			if (response.data) {
				this.settings.lastSyncTimestamp = Date.now();
				await this.saveSettings();
				new Notice("Successfully fetched vault data");
				return response.data;
			}

			console.log(
				"Extracted notes:",
				Object.keys(response?.data?.data || {})
			);

			return undefined;
		} catch (error) {
			console.error("Error fetching vault data:", error);
			throw error;
		}
	}

	async syncVault(mdContent?: string) {
		if (!this.settings.isAuthenticated) {
			new Notice("Please join the vault first!");
			return;
		}
		try {
			if (mdContent) {
				await axios.post(this.settings.serverUrl, mdContent, {
					headers: {
						"Content-Type": "text/plain",
						Authorization: `Bearer ${this.settings.joinCode}`,
					},
				});
			}
			// Fetch updated data
			const response = await this.fetchVaultData();
			if (response?.data?.data) {
				// Create all notes in parallel
				await Promise.all(
					Object.entries(response.data.data).map(
						([noteKey, noteData]) =>
							this.createOrUpdateNote(
								noteKey,
								noteData as NoteData
							)
					)
				);
			}
			new Notice("Sync completed!");
		} catch (error) {
			new Notice(`Sync failed: ${error.message}`);
		}
	}

	async joinVault(joinCode: string) {
		try {
			// pretend status === 200
			this.settings.joinCode = joinCode;
			this.settings.isAuthenticated = true;
			this.settings.lastSyncTimestamp = Date.now();
			await this.saveSettings();

			const response = await this.fetchVaultData();
			if (response?.data) {
				for (const [noteKey, noteData] of Object.entries(
					response.data
				)) {
					await this.createOrUpdateNote(
						noteKey,
						noteData as NoteData
					);
				}
			}

			new Notice("Join completed successfully!");
		} catch (error) {
			this.settings.isAuthenticated = false;
			await this.saveSettings();
			new Notice(`Join failed! ${error}`);
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
