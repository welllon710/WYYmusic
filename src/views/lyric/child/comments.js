import { dateFormat } from "../../../components/common/time";
export default class Comments{
    constructor(value){
          this.content = value.content //评论内容
          this.commentid = value.commentId //评论者ID
          this.like = value.likedCount //评论点赞数
          this.time = dateFormat('mm月dd号 HH:MM',new Date(value.time)) //评论时间
          this.img = value.user.avatarUrl //评论者头像
          this.name = value.user.nickname //评论者名字
          this.userid = value.user.userId //留着有用
          this.liked = value.liked //是否点赞
          if(value.beReplied.length!==0){
            this.replyid = value.beReplied[0].beRepliedCommentId //回复者ID
            this.replycontent = value.beReplied[0].content //回复者内容
            this.replyimg = value.beReplied[0].user.avatarUrl //回复者头像
            this.replyname = value.beReplied[0].user.nickname //回复者名字
            this.replyuserid = value.beReplied[0].user.userId //留着有用
            this.replyuserid = value.beReplied[0].user.userId //留着有用
          }

          

    }
}
