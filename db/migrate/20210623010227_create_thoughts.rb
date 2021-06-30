class CreateThoughts < ActiveRecord::Migration[6.1]
  def change
    create_table :thoughts do |t|
      t.string :title, null: false, limit: 50
      t.string :text, null: false
      t.string :shorted_text, null: false, limit: 100
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
