"use strict";

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

const KeybindingsWidget = Extension.imports.keybindingsWidget.KeybindingsWidget;

function init() {}

function buildPrefsWidget() {
  this.settings = ExtensionUtils.getSettings();

  const prefsWidget = new Gtk.Grid({
    column_spacing: 12,
    row_spacing: 12,
    visible: true,
  });

  // Keybindings label
  const keybindingsLabel = new Gtk.Label({
    label: "Keybindings",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(keybindingsLabel, 0, 1, 1, 1);

  // Keybindings widget
  const listBox = new Gtk.ListBox({ selection_mode: 0, hexpand: true });
  const keys = ["keybinding-toggle-mute"];
  const keybindingsWidget = new KeybindingsWidget(keys, this.settings);
  const keybindingsRow = new Gtk.ListBoxRow({ activatable: false });
  keybindingsRow.set_child(keybindingsWidget);
  listBox.append(keybindingsRow, 0);
  prefsWidget.attach(listBox, 1, 1, 1, 1);

  // Show top bar icon label
  const iconVisibleLabel = new Gtk.Label({
    label: "Show top bar icon",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(iconVisibleLabel, 0, 2, 1, 1);

  // Show top bar icon combo box
  const iconVisibleComboBox = new Gtk.ComboBoxText();
  iconVisibleComboBox.append("when-recording", "When recording");
  iconVisibleComboBox.append("always", "Always");
  iconVisibleComboBox.append("never", "Never");
  this.settings.bind(
    "icon-visibility",
    iconVisibleComboBox,
    "active-id",
    Gio.SettingsBindFlags.DEFAULT
  );
  prefsWidget.attach(iconVisibleComboBox, 1, 2, 1, 1);

  const showOSDLabel = new Gtk.Label({
    label: "Whether to show OSD notification",
    halign: Gtk.Align.START,
    visible: true,
  });
  prefsWidget.attach(showOSDLabel, 0, 3, 1, 1);

  let toggleOSD = new Gtk.Switch({
    active: this.settings.get_boolean("show-osd"),
    halign: Gtk.Align.END,
    visible: true,
  });
  prefsWidget.attach(toggleOSD, 1, 3, 1, 1);

  this.settings.bind(
    "show-osd",
    toggleOSD,
    "active",
    Gio.SettingsBindFlags.DEFAULT
  );

  return prefsWidget;
}
