export interface Roles {
  users?: boolean;
  guest?: boolean;
  subscriber?: boolean;
  admin?: boolean;
  superAdmin?: boolean;
}
export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  roles: Roles;
  veb?: boolean;
}

export class userUpload {
    
  file?            :   File;
  name?            :   string;
  discription?     :   string;
  url?             :   string;
  uid?             :   string;
  email?           :   string;
  displayName?     :   string;
  roles?           :   Roles;
  veb?             :   boolean;
  progress?        :   number;

  constructor(file:File) {
    this.file = file;
  }
}

