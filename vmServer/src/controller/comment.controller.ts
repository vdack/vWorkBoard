import { Controller, Get, Inject, Query  } from "@midwayjs/core";
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
};
