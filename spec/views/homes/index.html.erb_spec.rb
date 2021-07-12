require 'rails_helper'

RSpec.describe "homes/index.html.erb", type: :feature do
  before do
    visit homes_path
  end

  it 'Log in link has correnct path' do
    click_link 'Log in'
    expect(current_path).to eq sign_in_path
  end

  it 'Sign up link has correnct path' do
    click_link 'Sign up'
    expect(current_path).to eq new_user_registration_path
  end

  it 'footer logo link has correnct path' do
    click_on 'thoughts_logo'
    expect(current_path).to eq homes_path
  end
end
