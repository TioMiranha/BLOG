import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from 'fs/promises';


const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');
const SIMULATE_MS = 0;

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_MS <= 0) return;
    await new Promise(resolve => setTimeout(resolve, SIMULATE_MS))
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJSON = JSON.parse(jsonContent);
    const { posts } = parsedJSON;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(posts => posts.id === id);

    if (!post) throw new Error('Post não encontrado');

    return post;
  }
}

export const postRepository = new JsonPostRepository();