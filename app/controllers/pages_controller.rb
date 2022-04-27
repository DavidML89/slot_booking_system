class PagesController < ApplicationController
  def home
    @bookings = Booking.all
  end
end
