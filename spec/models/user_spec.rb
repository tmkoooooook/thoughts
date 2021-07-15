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
        expect(user.errors[:name]).to include("を入力してください")
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
        expect(user.errors[:email]).to include("を入力してください")
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
        expect(user.errors[:email]).to include("はすでに存在します")
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
        expect(user.errors[:password]).to include("を入力してください")
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
        expect(user.errors[:encrypted_password]).to include("を入力してください")
      end
    end

    context 'when is not uniqueness' do
      it 'is invalid' do
        create(:user,
          name: 'other user',
          email: 'other@example.com',
          password: 'otherpassword',
          encrypted_password:
          'otherpassword')
        user.password = 'otherpassword'
        user.encrypted_password = 'otherpassword'
        expect(user).to be_invalid
        expect(user.errors[:encrypted_password]).to include("はすでに存在します")
      end
    end
  end

  describe 'user_id' do
    context 'when present' do
      it 'is invalid' do
        user.user_id = 'testuser0'
        expect(user).to be_valid
      end
    end

    context 'when blank' do
      it 'is invalid' do
        user.user_id = ''
        expect(user).to be_invalid
        expect(user.errors[:user_id]).to include("を入力してください")
      end
    end

    context 'when is not uniqueness' do
      it 'is invalid' do
        create(:user,
          name: 'other user',
          email: 'other@example.com',
          password: 'otherpassword',
          encrypted_password: 'otherpassword',
          user_id: 'otheruserid')
        user.user_id = 'otheruserid'
        expect(user).to be_invalid
        expect(user.errors[:user_id]).to include("はすでに存在します")
      end
    end
  end

  describe 'def' do
    let!(:user) { create(:user) }
    let!(:other_user) { create(:user,
      name: 'other user',
      email: 'other@example.com',
      password: 'otherpassword',
      encrypted_password: 'otherpassword',
      user_id: 'otheruserid') }

    describe 'email_downcase' do
      it 'email is down case' do
        user.email = 'TESTUSER@example.com'
        expect(user.email_downcase).to eq 'testuser@example.com'
      end
    end

    describe 'intereted_in' do
      context 'when other_user is self' do
        it 'is nil' do
          expect(user.interested_in(user)).to eq nil
        end
      end

      context 'when other_user' do
        it 'is initialize relationship' do
          expect(user.interested_in(other_user)).to be_truthy
        end

        it 'is find relationship' do
          create(:relationship, user_id: user.id, interest_id: other_user.id)
          expect(user.interested_in(other_user)).to be_truthy
        end
      end
    end

    describe 'uninterested_in' do
      context 'when relationship find' do
        it 'destroy' do
          create(:relationship, user_id: user.id, interest_id: other_user.id)
          expect(user.uninterested_in(other_user)).to be_truthy
        end
      end

      context 'when relationship does not find' do
        it 'is nil' do
          expect(user.uninterested_in(other_user)).to eq nil
        end
      end
    end

    describe 'relationship_size' do
      context 'when find relationship' do
        it 'returns relationship size' do
          create(:relationship, user_id: user.id, interest_id: other_user.id)
          create(:relationship, user_id: other_user.id, interest_id: user.id)
          expect(user.relationship_size).to eq({ interesters_size: 1, interests_size: 1})
        end
      end

      context 'when does not find relationship' do
        it 'returns size 0' do
          expect(user.relationship_size).to eq({ interesters_size: 0, interests_size: 0 })
        end
      end
    end
  end
end
