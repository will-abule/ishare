export class Upload {
    
    file            :   File;
    name            :   string;
    title           :   string;
    discription     :   string;
    url             :   string;
    body            :   string;
    type            :   string;
    author          :   string;
    progress        :   number;
  
    constructor(file:File) {
      this.file = file;
    }
}
  
export class Article {
    
    // name            :   string;
    title           :   string;
    discription     :   string;
    url             :   string;
    body            :   string;
    type            :   string;
    author          :   string;
}