import { Provide } from '@midwayjs/core';
import { TComment } from './../entity/dbEntities';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class CommentService {
  @InjectEntityModel(TComment)
  commentModel: Repository<TComment>;

  async getComments(tid: number) {
    const findres = await this.commentModel.createQueryBuilder('comment')
    .leftJoinAndSelect('comment.user', 'user')
    .where('comment.tid = :tid', { tid: tid })
    .select(['comment.cid', 'comment.tid', 'comment.uid', 'user.name', 'comment.content','comment.date'])
    .getMany();

    console.log('by tid:', tid, 'find comments: ', findres);
    return findres.map((c) => {return {cid: c.cid, tid: c.tid, uid: c.uid, user_name: c.user.name, content: c.content, date: c.date}});
  };
  async createComment(tid: number, uid: number, content: string): Promise<any> {
    try {
      const data = {tid: tid, uid: uid, content: content, date: Date()};
      const res = await this.commentModel.save(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
  async deleteComment(cid: number): Promise<any> {
    try {
      const res = await this.commentModel.delete({cid: cid});
      return res;
    } catch (err) {
      throw err;
    }
  }
}
