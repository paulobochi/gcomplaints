class CompaniesController < ApplicationController
  before_action :set_company, only: %i[show update destroy]

  def index
    @companies = Company
      .ransack(query_params)
      .result
      .order(params[:sort])
      .page(params[:page])
      .per(params[:size])

    render json: @companies, meta: pagination_data(@companies), adapter: :json
  end

  def create
    @company = Company.new(company_params)

    if @company.save
      render json: @company
    else
      render_unprocessable_entity(@company.errors)
    end
  end

  def show
    render json: @company
  end

  def update
    if @company.update(company_params)
      render json: @company
    else
      render_unprocessable_entity(@company.errors)
    end
  end

  def destroy
    @company.destroy
  end

  private

  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.permit(:name)
  end

  def query_params
    {
      name_cont: params[:name]
    }
  end
end
