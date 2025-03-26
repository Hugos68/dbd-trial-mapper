class TrialWindow {
    private trial = $state() as Record<string, unknown>;
    private label = 'trial';

    public setTrial(trial: Record<string, unknown>) {
        this.trial = trial;
    }

    public getTrial() {
        return this.trial;
    }
        
}

const trialWindow = new TrialWindow();