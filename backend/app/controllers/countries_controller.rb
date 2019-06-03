class CountriesController < ApplicationController

  def index
    @countries = Country
      .ransack(query_params)
      .result
      .order(params[:sort])
      .page(params[:page])
      .per(params[:size])

    render json: @countries, meta: pagination_data(@countries), adapter: :json
  end

  private

  def query_params
    {
      name_cont: params[:name]
    }
  end

end
