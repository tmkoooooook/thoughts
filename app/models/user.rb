class User < ApplicationRecord
  has_many :thoughts
  has_many :relationships
  has_many :interests, through: :relationships, source: :interest
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'interest_id'
  has_many :interesters, through: :reverse_of_relationships, source: :user

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :name,               presence: true
  validates :email,              presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  validates :encrypted_password, presence: true, uniqueness: true
  validates :user_id,            presence: true, uniqueness: true

  def email_downcase
    self.email = self.email.downcase
  end

  def interested_in(other_user)
    return if self == other_user

    self.relationships.find_or_initialize_by(interest_id: other_user.id)
  end

  def uninterested_in(other_user)
    relationship = self.relationships.find_by(interest_id: other_user.id)
    relationship&.destroy if relationship
  end

  def relationship_size
    {
      interests_size: self.relationships.size,
      interesters_size: self.reverse_of_relationships.size
    }
  end
end
