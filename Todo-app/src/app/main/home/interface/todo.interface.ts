export interface Todo {
  uid:           string;
  title:         string;
  description:   string;
  priority:      Priority;
  creationDate:  Date;
  expiration:    Date;
  state:         State;
  tags:          string[];
}

export enum Priority {
  LOW =         'LOW',
  MEDIUM =      'MEDIUM',
  HIGH =        'HIGH'
}

export enum State {
  PENDING =     'PENDING',
  DONE =        'DONE',
  ALL =        'ALL'
}

