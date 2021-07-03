class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :interest, class_name: 'User'

  validates :user_id, presence: true
  validates :interest_id, presence: true

end
