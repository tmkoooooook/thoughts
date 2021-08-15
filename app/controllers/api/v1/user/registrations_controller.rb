class Api::V1::User::RegistrationsController < DeviseTokenAuth::RegistrationsController
  rescue_from ActionController::BadRequest, with: :render_error_image_bad_request

  def update
    render_update_error_user_not_found unless @resource

    update_images
    if @resource.send(resource_update_method, account_update_params)
      yield @resource if block_given?
      render_update_success
    else
      render_update_error
    end
  end

  private

  def render_error_image_bad_request(e)
    render json: { errors: { full_messages: [e] } }, status: 400
  end

  protected

  def sign_up_params
    params.require(:registration).permit(:name, :user_id, :email, :password)
  end

  def account_update_params
    params.require(:registration).permit(:name, :user_id, :email, :icon_image, :header_image)
  end

  def update_images
    images = {
      icon_image: params[:registration][:icon_image],
      header_image: params[:registration][:header_image]
    }
    images.each do |key, value|
      next unless value

      case key
      when :icon_image
        current_api_v1_user.icon_image = generate_image(value)
      when :header_image
        current_api_v1_user.header_image = generate_image(value)
      end
      params[:registration][key] = generate_image(value)
    end
  end

  def generate_image(image)
    uri = URI.parse(image)
    if uri.scheme == 'data'
      data = decode(uri)
      extension = extension(uri)
      write_file(data, extension)
    else
      raise ActionController::BadRequest, 'Dataファイルを指定してください'
    end
  end

  def decode(uri)
    opaque = uri.opaque
    data = opaque[opaque.index(',') + 1, opaque.size]
    Base64.decode64(data)
  end

  def extension(uri)
    opaque = uri.opaque
    mime_type = opaque[0, opaque.index(';')]
    case mime_type
    when 'image/png'
      '.png'
    when 'image/jpeg'
      '.jpg'
    else
      raise ActionController::BadRequest, '拡張子はjpeg,pngを指定してください'
    end
  end

  def write_file(data, extension)
    file = Tempfile.new(['img', extension])
    file.binmode
    file << data
    file.rewind
    file
  end
end
