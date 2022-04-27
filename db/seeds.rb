# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Booking.create!([
                  { id: "bd8fc476-ac50-3327-4ece-d73897796852", start_datetime: "2022-02-01T20:00:00.000Z", end_datetime: "2022-02-01T22:30:00.000Z" },
                  { id: "8c73d0ca-d999-4081-1558-e5ee6a40fcc2", start_datetime: "2022-01-31T23:00:00.000Z", end_datetime: "2022-02-01T06:00:00.000Z" },
                  { id: "086e3a96-2c74-3d2a-e839-ad10c82626d5", start_datetime: "2022-02-01T10:15:00.000Z", end_datetime: "2022-02-01T10:45:00.000Z" },
                  { id: "9e323a9e-adf9-605f-9386-c939a9a6af3f", start_datetime: "2022-02-01T13:55:00.000Z", end_datetime: "2022-02-01T14:30:00.000Z" },
                  { id: "0510de47-c86e-a64c-bb86-461c039b1012", start_datetime: "2022-02-02T10:00:00.000Z", end_datetime: "2022-02-02T20:00:00.000Z" },
                  { id: "4b24e6ab-bdc6-6b2c-e405-a8e01f0fde84", start_datetime: "2022-02-01T09:00:00.000Z", end_datetime: "2022-02-01T10:00:00.000Z" },
                  { id: "087ddebe-dd41-7e39-bda8-f617d8c4385d", start_datetime: "2022-02-01T11:30:00.000Z", end_datetime: "2022-02-01T13:00:00.000Z" },
                  { id: "5117e557-8d86-4180-9326-1ce0cf733982", start_datetime: "2022-02-01T13:00:00.000Z", end_datetime: "2022-02-01T13:10:00.000Z" }
                ])
