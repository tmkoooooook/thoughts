require 'rails_helper'

RSpec.describe Thought, type: :model do
  let(:thought) { build(:thought) }

  describe 'title' do
    context 'when title length over 50' do
      it 'is invalid' do
        thought.title = 'x' * 51
        expect(thought).to be_invalid
      end
    end
  end

  describe 'shorted_text' do
    context 'when shorted_text length over 100' do
      it 'is invalid' do
        thought.shorted_text = 'x' * 101
        expect(thought).to be_invalid
      end
    end
  end
end
