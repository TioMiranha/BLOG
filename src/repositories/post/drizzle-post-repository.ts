import { drizzleDb } from '@/db/drizzle';
import { PostModel } from '@/models/post/post-model';
import { logColor } from '@/utils/log-color';
import { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    logColor('\n findaAllPublic \n', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    logColor('\n findBySlugPublic \n', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    logColor('\n findAll \n', Date.now());
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    logColor('\n findById \n', Date.now());
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado para id');

    return post;
  }
}

(async () => {
  const repo = new DrizzlePostRepository();
  /*
  como-a-escrita-pode-mudar-sua-carreira
this-will-create-the-dillinger-image-and-pull-in-the-necessary-dependencies.-atbvp6
como-a-tecnologia-impacta-nosso-bem-estar
os-desafios-do-trabalho-remoto-moderno
como-manter-o-foco-no-mundo-digital
o-papel-do-silencio-em-uma-vida-criativa
  */
  //9eb8b7ac-2b48-4835-880a-a1c798e1a595 true
  //6b204dab-2312-4525-820a-a0463560835f false
  //const post = await repo.findBySlugPublic(
  //  'como-a-escrita-pode-mudar-sua-carreira',
  // );
  //logColor(post);
})();
