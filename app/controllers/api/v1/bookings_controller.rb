class Api::V1::BookingsController < ApplicationController
  def index
    bookings = Booking.all
    render json: bookings
  end

  def create
    booking = Booking.create(booking_params)
    render json: booking
  end

  private

  def booking_params
    params.require(:booking).permit(:start_datetime, :end_datetime)
  end
end
