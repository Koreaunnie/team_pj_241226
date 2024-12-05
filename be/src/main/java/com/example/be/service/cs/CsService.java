package com.example.be.service.cs;

import com.example.be.mapper.cs.CsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CsService {
    final CsMapper mapper;
}
