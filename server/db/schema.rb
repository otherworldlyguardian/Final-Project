# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170725135519) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "maps", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_maps_on_user_id"
  end

  create_table "systems", force: :cascade do |t|
    t.string "name"
    t.integer "region_id"
    t.integer "constellation_id"
    t.integer "solar_id"
    t.string "security"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "static1"
    t.string "static2"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.integer "eve_id"
    t.integer "corp_id"
    t.string "refresh_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "maps", "users"
end
