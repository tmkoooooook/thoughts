class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  if Rails.env.development? || Rails.env.test?
    storage :file
  else
    storage :fog
  end

  process :resize_by_mounted_as

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.user_id}"
  end

  def resize_by_mounted_as
    case mounted_as
    when :icon_image
      resize_to_limit(400, 400)
    when :header_image
      resize_to_limit(1500, 500)
    end
  end

  def extension_allowlist
    %w[jpg jpeg png]
  end

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
