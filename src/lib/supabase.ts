import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://rsscmciuemxtmlktlakz.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzc2NtY2l1ZW14dG1sa3RsYWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDMxMDcsImV4cCI6MjA1ODQxOTEwN30.JhZIN9obHSvCK2PbMEOybxVDGLnVmfyV4sX629G4sDQ",
);

export { supabase };
