package com.demo.demo.utilities.mapper;


import com.demo.demo.models.EIsActive;
import com.demo.demo.models.Permission;
import com.demo.demo.models.Role;
import com.demo.demo.models.User;
import com.demo.demo.payload.response.GetAllPermissionResponse;
import com.demo.demo.payload.response.GetAllUserResponse;
import com.demo.demo.payload.response.GetByIdPermissionResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ModelMapperManager implements ModelMapperService{

    private ModelMapper modelMapper;

    @Override
    public ModelMapper forResponse() {
        this.modelMapper.getConfiguration().setAmbiguityIgnored(true).setMatchingStrategy(MatchingStrategies.LOOSE);
        return this.modelMapper;
    }

    @Override
    public ModelMapper forRequest() {
        this.modelMapper.getConfiguration().setAmbiguityIgnored(true).setMatchingStrategy(MatchingStrategies.STRICT);
        return this.modelMapper;
    }

    @Bean(name = "customModelMapper")
    public ModelMapper customModelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        Converter<String, EIsActive> stringToEnumConverter = new Converter<String, EIsActive>() {
            @Override
            public EIsActive convert(MappingContext<String, EIsActive> context) {
                return EIsActive.valueOf(context.getSource());
            }
        };
        modelMapper.addConverter(stringToEnumConverter);

        modelMapper.addMappings(new PropertyMap<Permission, GetAllPermissionResponse>() {
            @Override
            protected void configure() {
                map().setEmail(source.getUser().getEmail());
            }
        });

        modelMapper.addMappings(new PropertyMap<Permission, GetByIdPermissionResponse>() {
            @Override
            protected void configure() {
                map().setEmail(source.getUser().getEmail());
                map().setStartDate(source.getStartdate());
                map().setEndDate(source.getEnddate());
                map().setIsActive(source.getIs_active());
            }
        });

        return modelMapper;
    }


    @Bean
    public ModelMapper roleMapper(){
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<User, GetAllUserResponse>() {
            @Override
            protected void configure() {
                using(ctx -> {
                    Set<Role> roles = ((User) ctx.getSource()).getRoles();
                    return roles != null ? roles.stream()
                            .map(role -> role.getName().name())
                            .collect(Collectors.toSet()) : null;
                }).map(source, destination.getRole());
            }
        });

        return modelMapper;
    }
}
