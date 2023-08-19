export enum DatabaseModel {
  users = "users",
  videos = "videos",
  notifications = "notifications",
}

export abstract class Model {
  protected model: DatabaseModel;
  protected id: number;

  constructor(model: DatabaseModel) {
    this.model = model;
    this.id = Math.floor(Math.random() * 1000);
  }
}


export class UserModel extends Model {

  protected name: string;
  protected email: string;
  protected type: "Consumer" | "Creator";

  constructor(name: string, email: string, type: "Consumer" | "Creator") {
    super(DatabaseModel.users);
    this.name = name;
    this.email = email;
    this.type = type;
    Database.Instance.create(this.model, this);

  }
}


export class ConsumerModel extends UserModel {
  protected isPremium: boolean;
  protected subscribedChannels: number[];

  constructor(name: string, email: string) {
    super(name, email, "Consumer");
    this.isPremium = false;
    this.subscribedChannels = [];

  }

  subscribe(creator: CreatorModel) {

    this.subscribedChannels.push(creator.getId());

  }
}

export class CreatorModel extends UserModel {

  protected noOfSubscribers: number;
  getId: any;

  constructor(name: string, email: string) {
    super(name, email, "Creator");
    this.noOfSubscribers = 0;

  }
}

export class VideoModel extends Model {

  protected link: string;
  protected title: string;
  protected categories: string[];
  protected views: number;
  protected likes: number;
  protected dislikes: number;
  protected userID: number;

  constructor(link: string, title: string, categories: string[], userID: number) {

    super(DatabaseModel.videos);
    this.link = link;
    this.title = title;
    this.categories = categories;
    this.views = 0;
    this.likes = 0;
    this.dislikes = 0;
    this.userID = userID;

    Database.Instance.create(this.model, this);
  }
}

export class NotificationModel extends Model {

  protected title: string;
  protected description: string;
  protected userID: number;
  protected hasRead: boolean;

  constructor(title: string, description: string, userID: number) {

    super(DatabaseModel.notifications);
    this.title = title;
    this.description = description;
    this.userID = userID;
    this.hasRead = false;
    Database.Instance.create(this.model, this);

  }
}

export class Database {

  private static instance: Database;
  private users: UserModel[];
  private videos: VideoModel[];
  private notifications: NotificationModel[];

  private constructor() {
    this.users = [];
    this.videos = [];
    this.notifications = [];
  }

  public static connect(): Database {

    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;

  }

  public static get Instance(): Database {
    return Database.connect();
  }

  public get Users(): UserModel[] {
    return this.users;
  }

  public get Videos(): VideoModel[] {
    return this.videos;
  }

  public get Notifications(): NotificationModel[] {
    return this.notifications;
  }

  public create(model: DatabaseModel, data: any) {

    switch (model) {
      case DatabaseModel.users:
        this.users.push(data);
        break;
      case DatabaseModel.videos:
        this.videos.push(data);
        break;
      case DatabaseModel.notifications:
        this.notifications.push(data);
        break;
      default:
        throw new Error("Invalid model");

    }
  }

  public upsert(model: DatabaseModel, data: any) {

    switch (model) {
      case DatabaseModel.users:
        this.upsertData(this.users, data);
        break;
      case DatabaseModel.videos:
        this.upsertData(this.videos, data);
        break;
      case DatabaseModel.notifications:
        this.upsertData(this.notifications, data);
        break;
      default:
        throw new Error("Invalid model");
    }

  }

  private upsertData(dataArray: any[], data: any) {

    const index = dataArray.findIndex((item) => item.id === data.id);

    if (index !== -1) {
      dataArray[index] = data;
    } else {
      dataArray.push(data);
    }
    
  }

  public delete(model: DatabaseModel, id: number) {

    switch (model) {
      case DatabaseModel.users:
        this.deleteData(this.users, id);
        break;
      case DatabaseModel.videos:
        this.deleteData(this.videos, id);
        break;
      case DatabaseModel.notifications:
        this.deleteData(this.notifications, id);
        break;
      default:
        throw new Error("Invalid model");
    }
  }

  private deleteData(dataArray: any[], id: number) {

    const index = dataArray.findIndex((item) => item.id === id);
    if (index !== -1) {
      dataArray.splice(index, 1);
    }

  }
}
