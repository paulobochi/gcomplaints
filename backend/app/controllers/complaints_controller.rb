class ComplaintsController < ApplicationController
  before_action :set_complaint, only: %i[show update destroy]

  def index
    @complaints = Complaint
      .ransack(query_params)
      .result
      .includes(:company, city: [ state: :country ])
      .order(params[:sort] || "created_at desc")
      .page(params[:page])
      .per(params[:size])

    render json: @complaints, meta: pagination_data(@complaints), adapter: :json, root: :records
  end

  def create
    @complaint = Complaint.new(complaint_params)

    if @complaint.save
      render json: @complaint
    else
      render_unprocessable_entity(@complaint.errors)
    end
  end

  def show
    render json: @complaint
  end

  def update
    if @complaint.update(complaint_params)
      render json: @complaint
    else
      render_unprocessable_entity(@complaint.errors)
    end
  end

  def destroy
    @complaint.destroy
  end

  private

  def set_complaint
    @complaint = Complaint.find(params[:id])
  end

  def complaint_params
    params.permit(:title, :description, :company_id, coordinates: [])
  end

  def query_params
    {
      company_id_eq: params[:company_id],
      city_id_in: (city_ids&.+ [1])
    }
  end

  def city_ids
    city && [city.id] ||
    state && state.cities.pluck(:id) ||
    country && City.in(state: country.states.pluck(:id)).pluck(:id)
  end

  def country
    if (params[:country_id].present?)
      @country ||= Country.find(params[:country_id])
    end
  end

  def state
    if (params[:state_id].present?)
      @state ||= (country&.states || State.all).find(params[:state_id])
    end
  end

  def city
    if (params[:city_id].present?)
      @city ||= (state&.cities || City.all).find(params[:city_id])
    end
  end
end
