class Thought < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 50 }
  validates :text, presence: true
  validates :shorted_text, presence: true, length: { maximum: 100 }
end
