require 'rails_helper'
require 'spec_helper'
require 'rspec_api_documentation'
require 'rspec_api_documentation/dsl'
require "rspec/json_expectations"

RspecApiDocumentation.configure do |config|
  config.format = [:json]
  config.curl_host = 'http://localhost:3000'
  config.api_name = "GComplaints API"
end

RSpec.configure do |config|
  config.include Request::JsonHelper
end