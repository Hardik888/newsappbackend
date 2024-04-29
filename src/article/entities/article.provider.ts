import { Connection } from 'mongoose';
import { articleSchema } from './article.schema';

export const ArticleProvider = {
    provide: 'ARTICLE_MODEL',
    useFactory: (connection: Connection) =>
        connection.model('ARTICLE', articleSchema),
    inject: ["DB"],
};

