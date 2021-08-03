require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'thoughts-user-images'
    config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/thoughts-user-images'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: Rails.application.credentials.aws[:access_key_id],
      aws_secret_access_key: Rails.application.credentials.aws[:secret_access_key],
      region: 'ap-northeast-1'
    }
    # キャッシュをS3に保存
    # config.cache_storage = :fog
  else
    config.storage :file
    config.enable_processing = false if Rails.env.test? #test:処理をスキップ
  end
end
