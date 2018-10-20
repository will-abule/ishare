export class Upload {
    
    file            :   File;
    name            :   string;
    title           :   string;
    url             :   string;
    body            :   string;
    videoUrl        :   string;
    project        :   string;
    progress        :   number;
  
    constructor(file:File) {
      this.file = file;
    }
}
  
export class Courses {
    
    // name            :   string;
    title           :   string;
    url             :   string;
    body            :   string;
    videoUrl        :   string;
    project        :   string;
}