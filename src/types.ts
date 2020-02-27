export interface TmuxWindow {
  name?: string;
  workingDir?: string;
  command?: string | Array<string>;
  keysToBeSent?: Array<string>;
}

export interface TmuxSession {
  name: string;
  defaultWorkingDir: string;
  defaultCommand: string | Array<string>;
  windows?: Array<TmuxWindow>;
}
