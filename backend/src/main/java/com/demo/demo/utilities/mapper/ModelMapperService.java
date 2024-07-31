package com.demo.demo.utilities.mapper;

import org.modelmapper.ModelMapper;

public interface ModelMapperService {
        ModelMapper forResponse();
        ModelMapper forRequest();
        ModelMapper customModelMapper();
        ModelMapper roleMapper();

}
