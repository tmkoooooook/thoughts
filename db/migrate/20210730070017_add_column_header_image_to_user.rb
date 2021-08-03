class AddColumnHeaderImageToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :header_image, :string
    rename_column :users, :image, :icon_image
  end
end
