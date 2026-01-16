import { JsonPostRepository } from '@/repositories/post/json-post-repositry';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  try {
    await drizzleDb.delete(postsTable); // Isso limpa a base de dados e fode tudo
    await drizzleDb.insert(postsTable).values(posts);

    console.log();
    console.log(`${posts.length} posts foram salvos na base de dados.`);
    console.log();
  } catch (e) {
    console.log();
    console.log('Foi pro caralho...');
    console.log();
    console.log(e);
    console.log();
  }
})();
