require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { build(:user) }

  describe 'name' do
    context 'when present' do
      it 'is valid' do
        user.name = 'test user'
        expect(user).to be_valid
      end
    end

    context 'when blank' do
      it 'is invalid' do
        user.name = ''
        expect(user).to be_invalid
        expect(user.errors[:name]).to include("can't be blank")
      end
    end
  end

  describe 'email' do
    context 'when present' do
      it 'is valid' do
        user.email = 'test@example.com'
        expect(user).to be_valid
      end
    end

    context 'when blank' do
      it 'is invalid' do
        user.email = ''
        expect(user).to be_invalid
        expect(user.errors[:email]).to include("can't be blank")
      end
    end

    context 'when correct format' do
      it 'is valid' do
        user.email = 'test@example.com'
        expect(user).to be_valid

        user.email = 'TEST@EXAMPLE.COM'
        expect(user).to be_valid

        user.email = 'TE.ST@example.com'
        expect(user).to be_valid

        user.email = 'te+st@example.com'
        expect(user).to be_valid

        user.email = 'te-st_@example.com'
        expect(user).to be_valid
      end
    end

    context 'when wrong format' do
      it 'is invalid' do
        user.email = 'test-at-example.com'
        expect(user).to be_invalid

        user.email = 'te st@example.com'
        expect(user).to be_invalid

        user.email = 'TEST@exam+ple.com'
        expect(user).to be_invalid

        user.email = 'test@example,com'
        expect(user).to be_invalid

        user.email = 'te-st_@example'
        expect(user).to be_invalid
      end
    end

    context 'when is not uniqueness' do
      it 'is invalid' do
        create(:user, name: 'other user', email: 'other@example.com')
        user.email = 'OTHER@EXAMPLE.COM'
        expect(user).to be_invalid
        expect(user.errors[:email]).to include("has already been taken")
      end
    end

    it 'is saved in downcase' do
      user.email = 'USER@EXAMPLE.COM'
      user.save!
      expect(user.reload.email).to eq 'user@example.com'
    end
  end

  describe 'password' do
    context 'when present' do
      it 'is valid' do
        user.password = 'password'
        expect(user).to be_valid
      end
    end

    context 'when blank' do
      it 'is invalid' do
        user.password = ''
        expect(user).to be_invalid
        expect(user.errors[:password]).to include("can't be blank")
      end
    end
  end

  describe 'encrypted_password' do
    context 'when present' do
      it 'is valid' do
        user.encrypted_password = 'encrypted_password'
        expect(user).to be_valid
      end
    end

    context 'when blank' do
      it 'is invalid' do
        user.encrypted_password = ''
        expect(user).to be_invalid
        expect(user.errors[:encrypted_password]).to include("can't be blank")
      end
    end

    context 'when is not uniqueness' do
      it 'is invalid' do
        create(:user, name: 'other user', email: 'other@example.com', password: 'otherpassword', encrypted_password: 'otherpassword')
        user.password = 'otherpassword'
        user.encrypted_password = 'otherpassword'
        expect(user).to be_invalid
        expect(user.errors[:encrypted_password]).to include("has already been taken")
      end
    end
  end
end
