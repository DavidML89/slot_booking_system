class Api::V1::BookingsController < ApplicationController
  def index
    bookings = Booking.all
    render json: bookings
  end

  def new
    booking = Booking.new
  end

  def create
    booking = Booking.create(booking_params)
    if booking.save
      render json: booking
    else
      render json: booking.errors
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:start_datetime, :end_datetime, :id)
  end
end
