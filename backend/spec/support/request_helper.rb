module Request
  module JsonHelper
    def json
      JSON.parse(response_body)
    end
  end
end