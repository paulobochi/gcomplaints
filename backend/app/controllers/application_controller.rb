class ApplicationController < ActionController::API
  include ActiveModel::Serialization
  
  def pagination_data(object)
    {
      current_page: object.current_page,
      next_page: object.next_page,
      prev_page: object.prev_page,
      total_pages: object.total_pages,
      total_count: object.total_count,
      page_size: object.limit_value
    }
  end

  def render_unprocessable_entity(errors)
    render json: { message: 'Unprocessable entity', errors: errors }, status: :unprocessable_entity
  end

end
