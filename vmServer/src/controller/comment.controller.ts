import { Controller, Get, Inject, Query, Post, Body, httpError, Del  } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { CommentService } from "../service/comment.service";

@Controller('/comment')
export class CommentController {
  @Inject()
  ctx: Context;
  @Inject()
  commentService: CommentService;
  @Get('/comments')
  async getComments (@Query('tid') tid) {
    const comments = await this.commentService.getComments(Number(tid));
    return {name: 'getComments', code: '200', status: 200, data: comments};
  }
  @Post('/comments')
  async createComments (@Body('tid')tid: number, @Body('uid')uid: number, @Body('content')content: string): Promise<any> {
    try {
      const res = await this.commentService.createComment(tid, uid, content);
      return {name: 'createComment', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }
  @Del('/comments')
  async deleteComments (@Query('cid')cid: number): Promise<any> {
    try {
      const res = await this.commentService.deleteComment(cid);
      return {name: 'deleteComments', code: '200', status: 200, data: res};
    } catch (err) {
      return new httpError.RequestTimeoutError('Unknown Error!');
    }
  }
};
