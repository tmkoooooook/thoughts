class ChangeDatatypeTextOfThoughts < ActiveRecord::Migration[6.1]
  def change
    change_column :thoughts, :text, :text
  end
end
