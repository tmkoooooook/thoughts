class CreateRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :relationships do |t|
      t.references :user, foreign_key: true
      t.references :interest, foreign_key: { to_table: :users }
      t.timestamps

      t.index [:user_id, :interest_id], unique: true
    end
  end
end
