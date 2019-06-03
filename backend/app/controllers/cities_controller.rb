class CitiesController < ApplicationController

  def index
    @cities = City
      .ransack(query_params)
      .result
      .order(params[:sort])
      .page(params[:page])
      .per(params[:size])

    render json: @cities, meta: pagination_data(@cities), adapter: :json
  end

  private

  def query_params
    {
      name_cont: params[:name],
      state_id_eq: params[:state_id]
    }
  end

end
