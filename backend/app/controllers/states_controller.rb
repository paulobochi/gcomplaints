class StatesController < ApplicationController

  def index
    @states = State
      .ransack(query_params)
      .result
      .order(params[:sort])
      .page(params[:page])
      .per(params[:size])

    render json: @states, meta: pagination_data(@states), adapter: :json
  end

  private

  def query_params
    {
      name_cont: params[:name],
      country_id_eq: params[:country_id]
    }
  end

end
