export class Upload {
    
    file            :   File;
    name            :   string;
    title           :   string;
    discription     :   string;
    url             :   string;
    body            :   string;
    videoUrl        :   string;
    category        :   string;
    type            :   string;
    progress        :   number;
  
    constructor(file:File) {
      this.file = file;
    }
}
  
export class Lesson {
    
    // name            :   string;
    title           :   string;
    discription     :   string;
    url             :   string;
    body            :   string;
    videoUrl        :   string;
    type            :   string;
    category        :   string;
}