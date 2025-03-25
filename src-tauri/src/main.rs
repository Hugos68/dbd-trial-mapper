// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, Emitter};

#[tauri::command]
fn trial(app: AppHandle, url: String) {
  app.emit("trial:done", &url).unwrap();
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![trial])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
