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

interface BasedSettings {
	joinCode: string;
	serverUrl: string;
}

const DEFAULT_SETTINGS: BasedSettings = {
	joinCode: "",
	serverUrl: "https://based.shmul.dev/submitText",
};

export default class BasedPlugin extends Plugin {
	settings: BasedSettings;

	async onload() {
		await this.loadSettings();
		new Notice("BasedPlugin loaded");

		// Add sync icon to the left ribbon
		const ribbonIconEl = this.addRibbonIcon(
			"folder-sync",
			"Sync Vault",
			(evt: MouseEvent) => {
				new JoinCodeModal(this.app, this).open();
			}
		);
		ribbonIconEl.addClass("based-plugin-ribbon-class");

		this.addCommand({
			id: "sync-vault",
			name: "Sync Vault",
			callback: () => {
				new JoinCodeModal(this.app, this).open();
			},
			editorCallback: (editor: Editor) => {
				const mdContent = editor.getDoc().getValue();
				this.syncVault(mdContent);
			},
		});

		// Add settings tab
		this.addSettingTab(new SyncSettingTab(this.app, this));
	}

	async syncVault(mdContent: string) {
		try {
			// Here you would implement the actual sync logic
			// This is a placeholder that shows a success message
			// new Notice(`Starting sync with join code: ${joinCode}`);

			axios.post(
				"https://based.shmul.dev/submitText",
				{
					body: { mdContent },
				},
				{
					headers: {
						"Content-Type": "application/text",
					},
				}
			);

			// Simulated delay to represent sync process
			await new Promise((resolve) => setTimeout(resolve, 1000));

			new Notice("Sync completed successfully!");
		} catch (error) {
			new Notice("Sync failed! Please try again.");
			console.error("Sync error:", error);
		}
	}

	async joinVault(joinCode: string) {
		try {
			// Here you would implement the actual sync logic
			// This is a placeholder that shows a success message
			// new Notice(`Starting sync with join code: ${joinCode}`);

			// Simulated delay to represent sync process
			await new Promise((resolve) => setTimeout(resolve, 1000));

			new Notice("Join completed successfully!");
		} catch (error) {
			new Notice("Sync failed! Please try again.");
			console.error("Sync error:", error);
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

		const syncButton = buttonContainer.createEl("button", { text: "Sync" });
		syncButton.classList.add("mod-cta");
		syncButton.addEventListener("click", async () => {
			const code = input.value.trim();
			if (code) {
				await this.plugin.joinVault("12345");
				this.onClose;
				this.close();
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
			.setName("Default Join Code")
			.setDesc("Enter a default join code (optional)")
			.addText((text) =>
				text
					.setPlaceholder("Enter join code")
					.setValue(this.plugin.settings.joinCode)
					.onChange(async (value) => {
						this.plugin.settings.joinCode = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
