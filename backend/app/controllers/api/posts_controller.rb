module Api
  class PostsController < ApplicationController
    before_action :set_post, only: %i[ show update destroy ]

    # GET /api/posts
    def index
      @posts = Post.all
      render json: @posts
    end

    # GET /api/posts/1
    def show
      render json: @post
    end

    # POST /api/posts
    def create
      @post = Post.new(post_params)
      if @post.save
        render json: @post, status: :created, location: api_post_url(@post)
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/posts/1
    def update
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    # DELETE /api/posts/1
    def destroy
      @post.destroy!
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:title, :body)
      end
  end
end
