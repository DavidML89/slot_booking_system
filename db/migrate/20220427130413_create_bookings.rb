class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings, id: false do |t|
      t.text :id, primary_key: true, null: false
      t.datetime :start_datetime
      t.datetime :end_datetime

      t.timestamps
    end
  end
end
