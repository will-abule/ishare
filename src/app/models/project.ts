export class Upload {
    
    file            :   File;
    name            :   string;
    title           :   string;
    discription     :   string;
    url             :   string;
    type            :   string;
    projectUrl      :   string;
    progress        :   number;
  
    constructor(file:File) {
      this.file = file;
    }
}
  
export class Project {
    
    // name            :   string;
    title           :   string;
    discription     :   string;
    projectUrl      :   string;
    type            :   string;
    url             :   string;
}